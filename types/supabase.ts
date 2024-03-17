export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          created_at: string
          email: string
          id: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      Event: {
        Row: {
          createdAt: string
          description: string | null
          eventType: Database["public"]["Enums"]["EventType"]
          flowSessionId: number
          id: number
        }
        Insert: {
          createdAt?: string
          description?: string | null
          eventType: Database["public"]["Enums"]["EventType"]
          flowSessionId: number
          id?: number
        }
        Update: {
          createdAt?: string
          description?: string | null
          eventType?: Database["public"]["Enums"]["EventType"]
          flowSessionId?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Event_flowSessionId_fkey"
            columns: ["flowSessionId"]
            isOneToOne: false
            referencedRelation: "FlowSession"
            referencedColumns: ["id"]
          }
        ]
      }
      FlowSession: {
        Row: {
          createdAt: string
          id: number
          workspaceId: number
        }
        Insert: {
          createdAt?: string
          id?: number
          workspaceId: number
        }
        Update: {
          createdAt?: string
          id?: number
          workspaceId?: number
        }
        Relationships: [
          {
            foreignKeyName: "FlowSession_workspaceId_fkey"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          }
        ]
      }
      Workspace: {
        Row: {
          created_at: string
          customerId: number
          description: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          customerId: number
          description?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          customerId?: number
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "Workspace_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      EventType: "START" | "BREAK" | "INTERRUPTION" | "LONG_BREAK" | "END"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
