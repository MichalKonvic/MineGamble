export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          bet: number
          created_at: string
          finished: boolean
          id: number
          mines_count: number
          mines_id: number
          player_id: number
          revealed_indexes: number[]
          size: number
          state: Database["public"]["Enums"]["game_state"]
          updated_at: string
          winning: number
        }
        Insert: {
          bet: number
          created_at?: string
          finished?: boolean
          id?: number
          mines_count?: number
          mines_id: number
          player_id: number
          revealed_indexes?: number[]
          size?: number
          state?: Database["public"]["Enums"]["game_state"]
          updated_at?: string
          winning?: number
        }
        Update: {
          bet?: number
          created_at?: string
          finished?: boolean
          id?: number
          mines_count?: number
          mines_id?: number
          player_id?: number
          revealed_indexes?: number[]
          size?: number
          state?: Database["public"]["Enums"]["game_state"]
          updated_at?: string
          winning?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_mines_id_fkey"
            columns: ["mines_id"]
            isOneToOne: true
            referencedRelation: "mine_indexes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      mine_indexes: {
        Row: {
          id: number
          indexes: number[]
        }
        Insert: {
          id?: number
          indexes?: number[]
        }
        Update: {
          id?: number
          indexes?: number[]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          auth_id: string
          balance: number
          created_at: string
          id: number
        }
        Insert: {
          auth_id: string
          balance?: number
          created_at?: string
          id?: number
        }
        Update: {
          auth_id?: string
          balance?: number
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_auth_id_fkey"
            columns: ["auth_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calc_winning: {
        Args: {
          bet: number
          revealed_indexes: number[]
          mines_count: number
          size: number
        }
        Returns: number
      }
      can_view_mine_indexes: {
        Args: {
          mines_id_check: number
          uid: string
        }
        Returns: boolean
      }
      cancel_inactive_games: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      checkout: {
        Args: {
          game_id: number
          token: string
        }
        Returns: undefined
      }
      filter_array_indexes: {
        Args: {
          arr: number[]
          max_value: number
        }
        Returns: unknown
      }
      generate_indexes:
        | {
            Args: {
              _size: number
              count: number
            }
            Returns: unknown
          }
        | {
            Args: {
              _size: number
              count: number
              taken_indexes: number[]
            }
            Returns: unknown
          }
      get_id_from_token: {
        Args: {
          token: string
        }
        Returns: number
      }
      get_max_array_value: {
        Args: {
          arr: number[]
        }
        Returns: number
      }
      has_array_hits: {
        Args: {
          revealed: number[]
          mines: number[]
        }
        Returns: boolean
      }
      has_funds: {
        Args: {
          bet: number
          player_id: number
        }
        Returns: boolean
      }
      has_mine_hit: {
        Args: {
          game_id: number
        }
        Returns: boolean
      }
      is_game_finished: {
        Args: {
          game_id: number
        }
        Returns: boolean
      }
      pick: {
        Args: {
          index: number
          game_id: number
          token: string
        }
        Returns: undefined
      }
      pick_random: {
        Args: {
          game_id: number
          token: string
        }
        Returns: undefined
      }
      user_uuid_to_profile_id: {
        Args: {
          uuid: string
        }
        Returns: number
      }
      validate_indexes: {
        Args: {
          size: number
          revealed_indexes: number[]
        }
        Returns: unknown
      }
    }
    Enums: {
      game_state: "win" | "lose" | "checkout" | "cancelled" | "not_evaluated"
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
