import { createClient } from '@supabase/supabase-js'

// Crear un cliente para interactuar con la bbdd de supabase
const supabase = createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');