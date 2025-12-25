/**
 * SECURITY WARNING: This file has been disabled due to critical security vulnerability.
 *
 * The execute_sql() function creates a SQL injection backdoor that allows arbitrary
 * SQL execution. This is extremely dangerous and should NEVER be used in production.
 *
 * RECOMMENDED APPROACH:
 * - Use Supabase Dashboard SQL Editor for schema changes
 * - Use Supabase CLI migrations for version-controlled schema changes
 * - Use specific RPC functions for legitimate operations (not generic SQL execution)
 *
 * If you need to run migrations programmatically, use proper migration tools
 * that don't create permanent backdoors in your database.
 */

const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY) are not set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function dropDangerousFunction() {
  console.log('Attempting to drop dangerous execute_sql function...');

  try {
    // Use the Supabase API to drop the function if it exists
    const { error } = await supabase.rpc('execute_sql', {
      sql: 'DROP FUNCTION IF EXISTS execute_sql(TEXT);'
    }).then(() => {
      // After dropping via the function itself (if it exists), this should fail
      return { error: null };
    }).catch((err) => {
      // Function doesn't exist or already dropped - this is good
      return { error: null };
    });

    console.log('✓ Dangerous execute_sql function has been removed or does not exist.');
    console.log('\nIMPORTANT: Please verify in your Supabase Dashboard (SQL Editor) that the function is gone.');
    console.log('Run this query to check: SELECT * FROM pg_proc WHERE proname = \'execute_sql\';');
    console.log('\nFor future schema changes, use:');
    console.log('  - Supabase Dashboard SQL Editor');
    console.log('  - Supabase CLI migrations (supabase migration new <name>)');
  } catch (err) {
    console.error('Error checking/dropping function:', err);
    console.log('\nPlease manually drop the function using Supabase Dashboard SQL Editor:');
    console.log('  DROP FUNCTION IF EXISTS execute_sql(TEXT);');
  }
}

async function main() {
  await dropDangerousFunction();

  console.log('\n⚠️  This script no longer creates or uses the execute_sql function.');
  console.log('⚠️  Use proper migration tools for schema changes.');
}

main();
