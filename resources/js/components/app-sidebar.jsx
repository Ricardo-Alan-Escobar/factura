import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, Folder, FileText, ChartColumn, Settings} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems = [
    {
        title: 'Panel',
        href: '/panel',
        icon: LayoutDashboard,
    },
    {
        title: 'Facturas',
        href: dashboard(),
        icon: FileText ,
    },
];
const secondaryNavItems = [
    {
        title: 'Configuración',
        href: '/settings',
        icon: Settings,
    },
    
];

const footerNavItems = [
    {
        title: 'Repository',
        href: 'https://github.com/Ricardo-Alan-Escobar/factura',
        icon: Folder,
    },
    
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                  <NavMain items={mainNavItems} title="PRINCIPAL" />
                 <NavMain items={secondaryNavItems} title="AJUSTES" />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
