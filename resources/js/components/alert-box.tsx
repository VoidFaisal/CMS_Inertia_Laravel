import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export function AlertDestructive({variant,message}:any) {
  return (
    <Alert variant={variant} className="">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription className="text-white capitalize">
        {message}
      </AlertDescription>
    </Alert>
  )
}
