"use client";

import { useEffect, useRef, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCloseLine,
  RiMenuLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { sitePath } from "@/lib/paths";

export interface HeaderLink {
  label: string;
  href: string;
  external?: boolean;
  children?: HeaderLink[];
  showOverview?: boolean;
}

interface HeaderAction {
  label: string;
  href: string;
  external?: boolean;
}

function resolvedHref(href: string): string {
  return href.startsWith("/") ? sitePath(href) : href;
}

function linkTarget(link: HeaderLink | HeaderAction) {
  return link.external ? { target: "_blank", rel: "noreferrer" } : {};
}

function DesktopLink({
  link,
  open,
  onToggle,
  onNavigate,
}: {
  link: HeaderLink;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const linkClassName =
    "rounded-inner px-3 py-2 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink";

  if (!link.children?.length) {
    return (
      <a
        href={resolvedHref(link.href)}
        className={linkClassName}
        onClick={onNavigate}
        {...linkTarget(link)}
      >
        {link.label}
        {link.external && <RiArrowRightUpLine className="ml-1 inline size-4" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className={`${linkClassName} flex cursor-pointer items-center gap-1`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
      >
        {link.label}
        <RiArrowDownSLine
          className={`size-4 transition-transform duration-[220ms] ease-exit ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div
          role="menu"
          className="glass-surface absolute top-[calc(100%+30px)] left-0 w-[330px] rounded-card p-3"
        >
          {link.showOverview !== false && (
            <a
              href={resolvedHref(link.href)}
              role="menuitem"
              onClick={onNavigate}
              className="mb-1 flex items-center gap-2 rounded-inner px-4 py-3 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink"
            >
              {link.label}
              <RiArrowRightLine className="size-4" aria-hidden="true" />
            </a>
          )}
          <div className={link.showOverview === false ? "" : "border-t border-ink/[0.08] pt-1"}>
            {link.children.map((child) => (
              <a
                key={child.href}
                href={resolvedHref(child.href)}
                role="menuitem"
                onClick={onNavigate}
                className="block rounded-inner px-4 py-3 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink"
                {...linkTarget(child)}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileLink({
  link,
  open,
  onToggle,
  onNavigate,
}: {
  link: HeaderLink;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const linkClassName =
    "rounded-inner px-4 py-3 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink";

  if (!link.children?.length) {
    return (
      <a
        href={resolvedHref(link.href)}
        onClick={onNavigate}
        className={linkClassName}
        {...linkTarget(link)}
      >
        {link.label}
        {link.external && <RiArrowRightUpLine className="ml-1 inline size-4" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        className={`${linkClassName} flex w-full cursor-pointer items-center justify-between text-left`}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={onToggle}
      >
        {link.label}
        <RiArrowDownSLine
          className={`size-5 transition-transform duration-[220ms] ease-exit ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div role="menu" className="mb-1 ml-4 grid border-l border-ink/[0.08] pl-2">
          {link.showOverview !== false && (
            <a
              href={resolvedHref(link.href)}
              role="menuitem"
              onClick={onNavigate}
              className={`${linkClassName} flex items-center gap-2`}
            >
              {link.label}
              <RiArrowRightLine className="size-4" aria-hidden="true" />
            </a>
          )}
          {link.children.map((child) => (
            <a
              key={child.href}
              href={resolvedHref(child.href)}
              role="menuitem"
              onClick={onNavigate}
              className={linkClassName}
              {...linkTarget(child)}
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader({
  links,
  action,
  homeHref = "/",
}: {
  links: HeaderLink[];
  action: HeaderAction;
  homeHref?: string;
}) {
  const [open, setOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const ActionIcon = action.external ? RiArrowRightUpLine : RiArrowRightLine;

  function closeMenus() {
    setOpen(false);
    setOpenSubmenu(null);
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navigationRef.current?.contains(event.target as Node)) closeMenus();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={navigationRef}>
      <header className="glass-surface fixed top-[18px] left-1/2 z-50 flex w-[min(1180px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-4 rounded-pill py-3 pr-3 pl-6">
        <a
          href={resolvedHref(homeHref)}
          aria-label="Applaudo home"
          className="shrink-0"
          onClick={closeMenus}
        >
          <img src={sitePath("/assets/brand/applaudo.svg")} alt="Applaudo" className="h-7 w-auto" />
        </a>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 tablet:flex">
          {links.map((link) => (
            <DesktopLink
              key={link.href}
              link={link}
              open={openSubmenu === link.href}
              onToggle={() => setOpenSubmenu((current) => (current === link.href ? null : link.href))}
              onNavigate={closeMenus}
            />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden tablet:inline-flex">
            <a href={resolvedHref(action.href)} onClick={closeMenus} {...linkTarget(action)}>
              {action.label} <ActionIcon />
            </a>
          </Button>
          <IconButton
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => {
              setOpen((value) => !value);
              setOpenSubmenu(null);
            }}
            className="tablet:hidden"
          >
            {open ? <RiCloseLine /> : <RiMenuLine />}
          </IconButton>
        </div>
      </header>

      {open && (
        <div className="glass-surface fixed inset-x-4 top-[102px] z-40 max-h-[calc(100dvh-118px)] overflow-y-auto rounded-card p-3 tablet:hidden">
          <nav aria-label="Primary" className="grid gap-1">
            {links.map((link) => (
              <MobileLink
                key={link.href}
                link={link}
                open={openSubmenu === link.href}
                onToggle={() => setOpenSubmenu((current) => (current === link.href ? null : link.href))}
                onNavigate={closeMenus}
              />
            ))}
          </nav>
          <Button asChild className="mt-2 w-full">
            <a href={resolvedHref(action.href)} onClick={closeMenus} {...linkTarget(action)}>
              {action.label} <ActionIcon />
            </a>
          </Button>
        </div>
      )}
    </div>
  );
}
