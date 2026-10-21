import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Footer() {
    const links = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Privacy Policy", href: "/policy" },
        { label: "Terms of Service", href: "/service" },
    ]
    return (
        <footer className="mt-auto border-t border-border pt-2 pb-2">
            <ul className="flex">
                {links.map((link) => (
                    <li>
                        <Link to={link.href}>
                            <Button variant="link">{link.label}</Button>
                        </Link>
                    </li>
                ))}
            </ul>
        </footer>
    );
}