import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  status?: "incomplete" | "current" | "complete";
  index: number;
  isLastStep?: boolean;
}

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number;
  orientation?: "horizontal" | "vertical";
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ title, description, status = "incomplete", index, isLastStep = false, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex", className)} {...props}>
        {/* Step content with indicator */}
        <div className="flex flex-col">
          {/* Step indicator */}
          <div className="flex items-center">
            <div
              className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium",
                status === "complete" && "border-primary bg-primary text-primary-foreground",
                status === "current" && "border-primary text-primary",
                status === "incomplete" && "border-input text-muted-foreground"
              )}
            >
              {status === "complete" ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            {/* Connector line */}
            {!isLastStep && (
              <div 
                className={cn(
                  "mx-2 h-[2px] w-16 flex-1",
                  status === "complete" && "bg-primary",
                  (status === "current" || status === "incomplete") && "bg-input"
                )}
              />
            )}
          </div>

          {/* Step text content */}
          <div className="mt-2">
            <p 
              className={cn(
                "text-sm font-medium",
                status === "complete" && "text-foreground",
                status === "current" && "text-foreground",
                status === "incomplete" && "text-muted-foreground"
              )}
            >
              {title}
            </p>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Step.displayName = "Step";

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep, orientation = "horizontal", className, children, ...props }, ref) => {
    const steps = React.Children.toArray(children).filter(
      (step) => React.isValidElement(step) && step.type === Step
    ) as React.ReactElement<StepProps>[];

    const clonedSteps = steps.map((step, index) => {
      let status: "incomplete" | "current" | "complete" = "incomplete";
      if (index < activeStep) status = "complete";
      if (index === activeStep) status = "current";

      return React.cloneElement(step, {
        status,
        index,
        isLastStep: index === steps.length - 1,
        key: index,
      });
    });

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full",
          orientation === "horizontal" ? "flex-row items-center justify-between space-x-2" : "flex-col space-y-4",
          className
        )}
        {...props}
      >
        {clonedSteps}
      </div>
    );
  }
);
Stepper.displayName = "Stepper";

export { Stepper, Step };
