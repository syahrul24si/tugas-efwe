import { useState, useEffect } from "react"
import StatCard from "../../components/StatCard"
import UserAnalyticsChart from "../../components/UserAnalyticsChart"
import OverviewTabs from "../../components/OverviewTabs"
import StatusPanel from "../../components/StatusPanel"
import BackG from "../../components/BackG"
import PageHeader from "../../components/PageHeader"
import { API } from "../../service/API"


const descriptions = {
  dashboard: {
    title: "Users",
    description: "Ringkasan user yang aktif pada sistem admin.",
  },
  admin: {
    title: "Admin Details",
    description: "Monitoring admin yang memiliki akses penuh terhadap sistem.",
  },
  member: {
    title: "Member Details",
    description: "Ringkasan member dengan akses laporan dan monitoring.",
  },
}

export default function Dashboard({
  activeMenu = "dashboard",
  accent = "#ef4444",
}) {
  const [adminCount, setAdminCount] = useState(0)
  const [memberCount, setMemberCount] = useState(0)

  useEffect(() => {
    API.fetchProfiles()
      .then((data) => {
        setAdminCount(data.filter((u) => u.role === "admin").length)
        setMemberCount(data.filter((u) => u.role === "member").length)
      })
      .catch((err) => console.error("Failed to fetch user counts:", err))
  }, [])

  const cards =
    activeMenu === "dashboard"
      ? [
          { label: "Admin", value: adminCount },
          { label: "Member", value: memberCount },
        ]
      : activeMenu === "admin"
      ? [{ label: "Admin", value: adminCount }]
      : [{ label: "Member", value: memberCount }]

  const totalUsers = adminCount + memberCount

  const chartData = [
    { name: "Admin", total: adminCount },
    { name: "Member", total: memberCount },
  ]

  return (
        <BackG>
            <PageHeader title="Dashboard" breadcrumb={["Dashboard"]}/>

          <div className="mt-6 grid gap-6 lg:grid-cols-[350px_1fr]">
            <div className="flex flex-wrap gap-6">
              {cards.map((card) => (
                <StatCard
                  key={card.label}
                  label={card.label}
                  value={card.value}
                  accent={accent}
                />
              ))}
            </div>

            <UserAnalyticsChart data={chartData} accent={accent} />
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
            <OverviewTabs
              totalUsers={totalUsers}
              adminCount={adminCount}
              memberCount={memberCount}
            />

            <StatusPanel accent={accent} />
          </div>
        </BackG>
  )
}