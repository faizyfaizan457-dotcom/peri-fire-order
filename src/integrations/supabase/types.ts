export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          id: string
          is_default: boolean
          label: string | null
          line1: string
          line2: string | null
          postcode: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1: string
          line2?: string | null
          postcode: string
          profile_id: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          is_default?: boolean
          label?: string | null
          line1?: string
          line2?: string | null
          postcode?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_notifications: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string | null
          read: boolean
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean
          title: string
          type: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string | null
          read?: boolean
          title?: string
          type?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          changed_by: string | null
          created_at: string
          id: string
          new_data: Json | null
          old_data: Json | null
          record_id: string
          table_name: string
        }
        Insert: {
          action: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id: string
          table_name: string
        }
        Update: {
          action?: string
          changed_by?: string | null
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          record_id?: string
          table_name?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          available: boolean
          created_at: string
          id: string
          image: string | null
          name: string
          sort_order: number
          tagline: string | null
          updated_at: string
        }
        Insert: {
          available?: boolean
          created_at?: string
          id: string
          image?: string | null
          name: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          available?: boolean
          created_at?: string
          id?: string
          image?: string | null
          name?: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      deals: {
        Row: {
          active: boolean
          code: string | null
          code_required: boolean
          created_at: string
          description: string | null
          discount_type: string
          discount_value: number
          end_at: string | null
          id: string
          min_order: number
          name: string
          start_at: string | null
          updated_at: string
          usage_count: number
          usage_limit: number | null
        }
        Insert: {
          active?: boolean
          code?: string | null
          code_required?: boolean
          created_at?: string
          description?: string | null
          discount_type: string
          discount_value?: number
          end_at?: string | null
          id?: string
          min_order?: number
          name: string
          start_at?: string | null
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
        }
        Update: {
          active?: boolean
          code?: string | null
          code_required?: boolean
          created_at?: string
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_at?: string | null
          id?: string
          min_order?: number
          name?: string
          start_at?: string | null
          updated_at?: string
          usage_count?: number
          usage_limit?: number | null
        }
        Relationships: []
      }
      delivery_zones: {
        Row: {
          active: boolean
          created_at: string
          estimated_minutes: number | null
          fee: number
          id: string
          min_order: number
          name: string
          postcode_prefixes: string[]
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          estimated_minutes?: number | null
          fee?: number
          id?: string
          min_order?: number
          name: string
          postcode_prefixes: string[]
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          estimated_minutes?: number | null
          fee?: number
          id?: string
          min_order?: number
          name?: string
          postcode_prefixes?: string[]
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      feature_areas: {
        Row: {
          active: boolean
          created_at: string
          hint: string | null
          id: string
          key: string
          label: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          hint?: string | null
          id?: string
          key: string
          label: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          hint?: string | null
          id?: string
          key?: string
          label?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      loyalty_points: {
        Row: {
          created_at: string
          description: string | null
          id: string
          order_id: string | null
          points: number
          profile_id: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          points?: number
          profile_id: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          order_id?: string | null
          points?: number
          profile_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "loyalty_points_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      modifier_groups: {
        Row: {
          created_at: string
          id: string
          max_options: number | null
          name: string
          required: boolean
          sort_order: number
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          max_options?: number | null
          name: string
          required?: boolean
          sort_order?: number
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          max_options?: number | null
          name?: string
          required?: boolean
          sort_order?: number
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      modifiers: {
        Row: {
          available: boolean
          created_at: string
          id: string
          modifier_group_id: string
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          available?: boolean
          created_at?: string
          id: string
          modifier_group_id: string
          name: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          available?: boolean
          created_at?: string
          id?: string
          modifier_group_id?: string
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modifiers_modifier_group_id_fkey"
            columns: ["modifier_group_id"]
            isOneToOne: false
            referencedRelation: "modifier_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_modifiers: {
        Row: {
          created_at: string
          id: string
          modifier_group_name: string
          modifier_name: string
          order_item_id: string
          price: number
        }
        Insert: {
          created_at?: string
          id?: string
          modifier_group_name: string
          modifier_name: string
          order_item_id: string
          price?: number
        }
        Update: {
          created_at?: string
          id?: string
          modifier_group_name?: string
          modifier_name?: string
          order_item_id?: string
          price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_item_modifiers_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          base_price: number
          created_at: string
          id: string
          line_total: number
          meal_upgrade: boolean
          meal_upgrade_price: number
          notes: string | null
          order_id: string
          product_id: string | null
          product_name: string
          product_size_label: string | null
          quantity: number
        }
        Insert: {
          base_price: number
          created_at?: string
          id?: string
          line_total?: number
          meal_upgrade?: boolean
          meal_upgrade_price?: number
          notes?: string | null
          order_id: string
          product_id?: string | null
          product_name: string
          product_size_label?: string | null
          quantity?: number
        }
        Update: {
          base_price?: number
          created_at?: string
          id?: string
          line_total?: number
          meal_upgrade?: boolean
          meal_upgrade_price?: number
          notes?: string | null
          order_id?: string
          product_id?: string | null
          product_name?: string
          product_size_label?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          notes: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          delivery_address_id: string | null
          delivery_address_json: Json | null
          delivery_fee: number
          discount_amount: number
          id: string
          notes: string | null
          payment_intent_id: string | null
          payment_provider: string | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          scheduled_at: string | null
          source: string
          status: Database["public"]["Enums"]["order_status"]
          subtotal: number
          tax_amount: number
          tip_amount: number
          total: number
          type: Database["public"]["Enums"]["order_type"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address_id?: string | null
          delivery_address_json?: Json | null
          delivery_fee?: number
          discount_amount?: number
          id?: string
          notes?: string | null
          payment_intent_id?: string | null
          payment_provider?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          scheduled_at?: string | null
          source?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax_amount?: number
          tip_amount?: number
          total?: number
          type: Database["public"]["Enums"]["order_type"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          delivery_address_id?: string | null
          delivery_address_json?: Json | null
          delivery_fee?: number
          discount_amount?: number
          id?: string
          notes?: string | null
          payment_intent_id?: string | null
          payment_provider?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          scheduled_at?: string | null
          source?: string
          status?: Database["public"]["Enums"]["order_status"]
          subtotal?: number
          tax_amount?: number
          tip_amount?: number
          total?: number
          type?: Database["public"]["Enums"]["order_type"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_delivery_address_id_fkey"
            columns: ["delivery_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      product_modifiers: {
        Row: {
          created_at: string
          modifier_group_id: string
          product_id: string
        }
        Insert: {
          created_at?: string
          modifier_group_id: string
          product_id: string
        }
        Update: {
          created_at?: string
          modifier_group_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_modifiers_modifier_group_id_fkey"
            columns: ["modifier_group_id"]
            isOneToOne: false
            referencedRelation: "modifier_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_modifiers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_sizes: {
        Row: {
          created_at: string
          id: string
          label: string
          price: number
          product_id: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          price: number
          product_id: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          price?: number
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_sizes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available: boolean
          category_id: string
          created_at: string
          description: string | null
          id: string
          image: string | null
          meal_upgrade_price: number | null
          name: string
          sort_order: number
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          available?: boolean
          category_id: string
          created_at?: string
          description?: string | null
          id: string
          image?: string | null
          meal_upgrade_price?: number | null
          name: string
          sort_order?: number
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          available?: boolean
          category_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          meal_upgrade_price?: number | null
          name?: string
          sort_order?: number
          tags?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      restaurant_settings: {
        Row: {
          address: string | null
          collection_wait_minutes: number
          currency: string
          delivery_enabled: boolean
          email: string | null
          id: string
          name: string
          online_discount_percent: number
          opening_hours: Json | null
          phone: string | null
          stripe_enabled: boolean
          tax_rate: number
          updated_at: string
        }
        Insert: {
          address?: string | null
          collection_wait_minutes?: number
          currency?: string
          delivery_enabled?: boolean
          email?: string | null
          id?: string
          name?: string
          online_discount_percent?: number
          opening_hours?: Json | null
          phone?: string | null
          stripe_enabled?: boolean
          tax_rate?: number
          updated_at?: string
        }
        Update: {
          address?: string | null
          collection_wait_minutes?: number
          currency?: string
          delivery_enabled?: boolean
          email?: string | null
          id?: string
          name?: string
          online_discount_percent?: number
          opening_hours?: Json | null
          phone?: string | null
          stripe_enabled?: boolean
          tax_rate?: number
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          order_id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id: string
          rating: number
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          order_id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          can_manage: boolean
          can_view: boolean
          created_at: string
          feature: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          can_manage?: boolean
          can_view?: boolean
          created_at?: string
          feature: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          can_manage?: boolean
          can_view?: boolean
          created_at?: string
          feature?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_bootstrap_open: { Args: never; Returns: boolean }
      claim_first_admin: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_permission: {
        Args: { _feature: string; _manage?: boolean; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_audit: {
        Args: {
          _action: string
          _new_data?: Json
          _old_data?: Json
          _record_id: string
          _table_name: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "staff"
      order_status:
        | "new"
        | "confirmed"
        | "preparing"
        | "ready"
        | "out_for_delivery"
        | "completed"
        | "cancelled"
        | "refunded"
      order_type: "collection" | "delivery"
      payment_status: "pending" | "paid" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff"],
      order_status: [
        "new",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "completed",
        "cancelled",
        "refunded",
      ],
      order_type: ["collection", "delivery"],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const
