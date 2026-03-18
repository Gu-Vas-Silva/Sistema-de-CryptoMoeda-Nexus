import usersData from "../mocks/user.json"

export function getActiveUsersComparison() {

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const lastMonthDate = new Date(currentYear, currentMonth - 1)
  const lastMonth = lastMonthDate.getMonth()
  const lastMonthYear = lastMonthDate.getFullYear()

  let currentTotal = 0
  let lastMonthTotal = 0

  usersData.users.forEach((user) => {

    if (user.status !== "ACTIVE") return

    const createdDate = new Date(user.createdAt)

    const month = createdDate.getMonth()
    const year = createdDate.getFullYear()

    if (
      year < currentYear ||
      (year === currentYear && month <= currentMonth)
    ) {
      currentTotal++
    }

    if (
      year < lastMonthYear ||
      (year === lastMonthYear && month <= lastMonth)
    ) {
      lastMonthTotal++
    }

  })

  const difference = currentTotal - lastMonthTotal

  const percentage =
    lastMonthTotal === 0
      ? 100
      : (difference / lastMonthTotal) * 100

  return {
    currentTotal,
    lastMonthTotal,
    difference,
    percentage
  }
}