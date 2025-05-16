/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jn1nv7yDuLH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import React from "react"

export default function Invoice() {
  return (
    <React.Fragment>
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-4">
          <MountainIcon className="w-8 h-8" />
          <h1 className="text-2xl font-bold">ACME Inc.</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Invoice #INV001</h2>
          <p className="text-gray-500">Date: 12/12/2023</p>
        </div>
      </header>
      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>John Doe</p>
            <p>johndoe@example.com</p>
            <p>+1 (123) 456-7890</p>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Item 1</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$100</TableCell>
                  <TableCell>$200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Item 2</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$150</TableCell>
                  <TableCell>$150</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <footer className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center">
              <div>Subtotal</div>
              <div className="ml-auto">$350.00</div>
            </div>
            <div className="flex items-center">
              <div>Taxes (10%)</div>
              <div className="ml-auto">$35.00</div>
            </div>
            <Separator />
            <div className="flex items-center font-medium">
              <div>Total</div>
              <div className="ml-auto">$385.00</div>
            </div>
          </CardContent>
        </Card>
      </footer>
    </React.Fragment>
  )
}

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}