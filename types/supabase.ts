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
      Customer: {
        Row: {
          created_at: string
          email: string
          id: number
          plan: Database["public"]["Enums"]["Plan"]
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          plan?: Database["public"]["Enums"]["Plan"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          plan?: Database["public"]["Enums"]["Plan"]
        }
        Relationships: []
      }
      ReferenceScreenshot: {
        Row: {
          approvedOn: string | null
          content: string
          id: string
          name: string
          runId: string | null
          workspaceId: string | null
        }
        Insert: {
          approvedOn?: string | null
          content: string
          id: string
          name: string
          runId?: string | null
          workspaceId?: string | null
        }
        Update: {
          approvedOn?: string | null
          content?: string
          id?: string
          name?: string
          runId?: string | null
          workspaceId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ReferenceScreenshot_workspaceId_fkey"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      Run: {
        Row: {
          id: string
          workspaceId: string
        }
        Insert: {
          id: string
          workspaceId: string
        }
        Update: {
          id?: string
          workspaceId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Run_workspaceId_fkey"
            columns: ["workspaceId"]
            isOneToOne: false
            referencedRelation: "Workspace"
            referencedColumns: ["id"]
          },
        ]
      }
      Screenshot: {
        Row: {
          content: string
          id: string
          name: string
          runId: string
        }
        Insert: {
          content: string
          id: string
          name: string
          runId: string
        }
        Update: {
          content?: string
          id?: string
          name?: string
          runId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Screenshot_runId_fkey"
            columns: ["runId"]
            isOneToOne: false
            referencedRelation: "Run"
            referencedColumns: ["id"]
          },
        ]
      }
      Workspace: {
        Row: {
          createdAt: string
          customerId: number | null
          id: string
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          customerId?: number | null
          id: string
          name: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          customerId?: number | null
          id?: string
          name?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Workspace_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
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
      Plan: "FREE" | "STANDARD" | "PRO"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
