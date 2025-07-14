import { type NextRequest, NextResponse } from "next/server"
import { departments, updateTimestamp } from "@/lib/admin-data"

// PUT - Update department
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const deptIndex = departments.findIndex((d) => d.id === params.id)

    if (deptIndex === -1) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 })
    }

    departments[deptIndex] = updateTimestamp({
      ...departments[deptIndex],
      ...body,
    })

    return NextResponse.json({
      success: true,
      data: departments[deptIndex],
      message: "Department updated successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update department" }, { status: 500 })
  }
}

// DELETE - Delete department
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deptIndex = departments.findIndex((d) => d.id === params.id)

    if (deptIndex === -1) {
      return NextResponse.json({ success: false, error: "Department not found" }, { status: 404 })
    }

    departments.splice(deptIndex, 1)

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete department" }, { status: 500 })
  }
}
