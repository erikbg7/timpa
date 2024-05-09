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
      File: {
        Row: {
          customerId: number | null
          extension: string
          id: string
          language: Database["public"]["Enums"]["Languages"]
          name: string
          url: string
        }
        Insert: {
          customerId?: number | null
          extension: string
          id: string
          language: Database["public"]["Enums"]["Languages"]
          name: string
          url: string
        }
        Update: {
          customerId?: number | null
          extension?: string
          id?: string
          language?: Database["public"]["Enums"]["Languages"]
          name?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "File_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
        ]
      }
      Segment: {
        Row: {
          end: number
          id: number
          language: Database["public"]["Enums"]["Languages"]
          segmentId: string
          start: number
          text: string
          transcriptionId: string
        }
        Insert: {
          end: number
          id: number
          language: Database["public"]["Enums"]["Languages"]
          segmentId: string
          start: number
          text: string
          transcriptionId: string
        }
        Update: {
          end?: number
          id?: number
          language?: Database["public"]["Enums"]["Languages"]
          segmentId?: string
          start?: number
          text?: string
          transcriptionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Segment_transcriptionId_fkey"
            columns: ["transcriptionId"]
            isOneToOne: false
            referencedRelation: "Transcription"
            referencedColumns: ["id"]
          },
        ]
      }
      Transcription: {
        Row: {
          createdAt: string
          fileId: string
          id: string
          language: Database["public"]["Enums"]["Languages"]
        }
        Insert: {
          createdAt?: string
          fileId: string
          id: string
          language: Database["public"]["Enums"]["Languages"]
        }
        Update: {
          createdAt?: string
          fileId?: string
          id?: string
          language?: Database["public"]["Enums"]["Languages"]
        }
        Relationships: [
          {
            foreignKeyName: "Transcription_fileId_fkey"
            columns: ["fileId"]
            isOneToOne: false
            referencedRelation: "File"
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
      Languages: "CA" | "ES" | "EN" | "FR" | "IT"
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
