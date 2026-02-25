import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { analyzeSajuSchema, fortuneTypeOptions, type AnalyzeSajuRequest } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface SajuFormProps {
  onSubmit: (data: AnalyzeSajuRequest) => void;
  isPending: boolean;
}

export function SajuForm({ onSubmit, isPending }: SajuFormProps) {
  const form = useForm<AnalyzeSajuRequest>({
    resolver: zodResolver(analyzeSajuSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      birthTime: "",
      gender: "male",
      calendarType: "solar",
      fortuneType: "today",
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 shadow-xl shadow-accent/5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-medium">이름</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="홍길동" 
                      className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12 text-lg" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">생년월일</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="birthTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">태어난 시간</FormLabel>
                    <FormControl>
                      <Input 
                        type="time" 
                        className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">성별</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="calendarType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-medium">양력/음력</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solar">
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-amber-500" />
                            Solar (양력)
                          </div>
                        </SelectItem>
                        <SelectItem value="lunar">
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4 text-indigo-400" />
                            Lunar (음력)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fortuneType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary font-medium">운세 종류</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || "today"}>
                    <FormControl>
                      <SelectTrigger className="bg-background/50 border-accent/20 focus:border-accent focus:ring-accent/20 h-12">
                        <SelectValue placeholder="운세 종류 선택" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {fortuneTypeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-14 text-lg font-serif bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reading Destiny...
                </span>
              ) : (
                "운세 확인하기 →"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}
