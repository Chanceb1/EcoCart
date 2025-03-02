import * as React from "react"
import { ChevronRight } from "lucide-react"

import { SearchForm } from "@/components/searchfilter-search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/searchfilter-sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Category",
      url: "#",
      items: [
        {
          id: "electronics",
          label: "Electronics",
        },
        {
          id: "consumable",
          label: "Consumable",
        },
        {
          id: "storage",
          label: "Storage",
        }
      ],
    },
    {
      title: "Recycle Method",
      url: "#",
      items: [
        {
          id: "paper",
          label: "Paper",
        },
        {
          id: "metal",
          label: "Metal",
        },
        {
          id: "compostable",
          label: "Compostable",
        },
        {
          id: "glass",
          label: "Glass",
        }
      ],
    },
    {
      title: "Certificates",
      url: "#",
      items: [
        {
          id: "cert1",
          label: "Certificate 1",
        },
        {
          id: "cert2",
          label: "Certificate 2",
        },
        {
          id: "cert3",
          label: "Certificate 3",
        },
        {
          id: "cert4",
          label: "Certificate 4",
        },
        {
          id: "cert5",
          label: "Certificate 5",
        },
        {
          id: "cert6",
          label: "Certificate 6",
        },
      ],
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/*<VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />*/}
        <div className="pt-16"></div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="p-2">
                    {item.items.map((item) => (
                      <label for={item.id}> 
                        <SidebarMenuItem key={item.id} className="border-2 flex gap-2 overflow-hidden 
                          rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] 
                          hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 
                          active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none 
                          disabled:opacity-50 text-ellipsis overflow-clip"
                        > 
                            <input type="checkbox" id={item.id} name={item.id} value={item.id} />
                            {item.label}
                        </SidebarMenuItem>
                        </label>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        <div className="p-2 border-t-2 border-b">
          <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="outline"
            size="icon"
            className={cn("bg-green-600 hover:bg-green-700 font-bold w-2/5 gap-2 p-2")}
          >
            Filter
          </Button>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
