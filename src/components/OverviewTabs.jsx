import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import SummaryRow from "./SummaryRow"

export default function OverviewTabs({ totalUsers, adminCount, memberCount }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121212] p-5">
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
        Overview
      </h2>

      <Tabs defaultValue="all" className="mt-4">
        <TabsList className="bg-white/30">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryRow label="Total Users" value={String(totalUsers)} />
            <SummaryRow label="Admin Active" value={`${adminCount} User`} />
            <SummaryRow label="Member Active" value={`${memberCount} User`} />
          </div>
        </TabsContent>

        <TabsContent value="admin">
          <div className="mt-4">
            <SummaryRow label="Total Admin" value={`${adminCount} User`} />
          </div>
        </TabsContent>

        <TabsContent value="member">
          <div className="mt-4">
            <SummaryRow label="Total Member" value={`${memberCount} User`} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
