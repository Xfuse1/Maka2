-- ============================================================================
-- CRITICAL SECURITY FIX: Drop the dangerous execute_sql function
-- ============================================================================
--
-- This script removes the execute_sql() function that allows arbitrary SQL
-- execution. This function is a critical security vulnerability that could
-- lead to full database compromise.
--
-- HOW TO USE:
-- 1. Open Supabase Dashboard > SQL Editor
-- 2. Paste this entire script
-- 3. Click "Run" to execute
-- 4. Verify the function is gone by running the check query at the bottom
--
-- ============================================================================

-- Drop the dangerous function
DROP FUNCTION IF EXISTS execute_sql(TEXT);
DROP FUNCTION IF EXISTS execute_sql(sql TEXT);

-- Verify it's gone (should return 0 rows)
SELECT
    proname as function_name,
    pg_get_functiondef(oid) as definition
FROM pg_proc
WHERE proname = 'execute_sql';

-- If the above query returns any rows, the function still exists!
-- Re-run this script or contact your database administrator.
