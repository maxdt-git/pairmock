import { auth } from "./auth.ts";
import { prisma } from "./prisma.ts";

export async function getGoogleAccessToken(userId: string) {
    const result = await prisma.account.findFirst({
        where: {
            userId: userId,
            providerId: "google"
        }
    })
    if (!result) {
        return null
    }
    try {
        const response = await auth.api.getAccessToken({
            body: {
                accountId: result.id,
                userId: userId
            },
        });
        return response.accessToken ?? null
    }
    catch (e) {
        console.error(e)
        return null
    }
}

export async function createMeetAndCalendarEvent(slot: any, host: any, booker: any) {
    const hostToken = await getGoogleAccessToken(host.id);
    const bookerToken = await getGoogleAccessToken(booker.id);
    const organizer = hostToken ? { token: hostToken, isHost: true } : bookerToken ? { token: bookerToken, isHost: false } : null;
    if (!organizer) {
        return null
    }
    const { token: accessToken, isHost } = organizer;
    const attendeeEmail = isHost ? booker.email : host.email
    const event = {
        summary: `PairMock | Meeting: ${host.name} & ${booker.name}`,
        description: `${slot.description} | ${slot.difficulty}`,
        start: {
            dateTime: slot.scheduledAt.toISOString(),
        },
        end: {
            dateTime: new Date(slot.scheduledAt.getTime() + slot.durationMinutes * 60000).toISOString(),
        },
        attendees: [{ email: attendeeEmail }],
        reminders: {
            useDefault: false,
            overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
            ],
        },
        conferenceData: {
            createRequest: {
                requestId: crypto.randomUUID(),
                conferenceSolutionKey: {
                    type: 'hangoutsMeet',
                },
            },
        },
    }
    try {
        const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(event),
            }
        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return { googleEventId: result.id, meetLink: result.hangoutLink }
    } catch (error) {
        console.error(error);
    }
}


export async function deleteCalendarEvent(bookerId: string, hostId: string, googleEventId: string) {
    const tokens = [
        await getGoogleAccessToken(hostId),
        await getGoogleAccessToken(bookerId),
    ].filter(Boolean);
    for (const token of tokens) {
        const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${googleEventId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.status === 204 || response.ok) {
            return true;
        }
    }
    console.error("Could not delete Google Calendar event");
    return false;
}