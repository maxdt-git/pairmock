import { Navigate, Outlet } from "react-router";
import { authClient } from "@/lib/auth-client";
import { useTranslation } from "react-i18next";

export default function GuestRoute() {
    const { t } = useTranslation();
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return <p>{t("common.loading")}</p>;
    }

    if (session) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}