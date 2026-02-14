import AppLogoIcon from './app-logo-icon';
import { FolderOpen  } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
          <div className="flex aspect-square size-9 items-center bg-blue-600  justify-center rounded-md  text-sidebar-primary-foreground">
                <FolderOpen  className="size-5 dark:text-white" />
            </div>
             <div className="ml-1 grid flex-1 text-left text-base">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                   FacturaBox
                </span>
                <span className="mb-0.5 truncate leading-tight text-xs text-sidebar-secondary-foreground dark:text-zinc-400 text-zinc-600">
                    Repositorio de facturas
                </span>
            </div>
        </>
    );
}
