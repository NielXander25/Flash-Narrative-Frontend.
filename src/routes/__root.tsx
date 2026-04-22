import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import faviconUrl from "@/assets/flash-narrative-logo.png?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Flash Narrative — Enterprise PR Intelligence" },
      {
        name: "description",
        content:
          "Real-time narrative intelligence and systemic risk monitoring for enterprise communications teams.",
      },
      { name: "author", content: "Flash Narrative" },
      { name: "theme-color", content: "#0A0A0B" },
      { property: "og:title", content: "Flash Narrative — Enterprise PR Intelligence" },
      {
        property: "og:description",
        content: "Bloomberg-grade narrative intelligence for global enterprises.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: faviconUrl },
      { rel: "apple-touch-icon", href: faviconUrl },
    ],
  }),
  shellComponent: RootShell,
  component: () => <Outlet />,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-amber">404</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This intelligence channel could not be located.
        </p>
        <a
          href="/"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          Return to Command Center
        </a>
      </div>
    </div>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
