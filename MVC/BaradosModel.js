import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
class Barados {

    #supabaseConnection= createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');
    
    fetchData = async (table) => {


        let fetched= await this.#supabaseConnection.from(table).select();

       

        return fetched.data;
    }
}

export default Barados;