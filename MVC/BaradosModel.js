import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
class Barados {

    #supabaseConnection= createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');
    
    fetchData = async (table) => {


        let fetched= await this.#supabaseConnection.from(table).select();

    //    console.log(fetched.data);

        // for (let data of fetched.data) {
        //     data=JSON.stringify(data);
        // }

        return JSON.parse(JSON.stringify(fetched.data));
    }

    logIn = async (email,passwd)=>{

        const {data,error}= await this.#supabaseConnection.auth.signInWithPassword({
            email: email,
            password: passwd,
          });

          if (error) {
            return false;
          }

          if (data) {
            return data[user];
          }
    }
    
    logOff = async ()=>{

        const {error}= await this.#supabaseConnection.auth.signOut();

          if (error) {
            return false;
          }

    }    
    
    currentUser = async ()=>{

        const {data,error}= await this.#supabaseConnection.auth.getSession();

          if (error) {
            return error;
          }

          if (data) {
            return data[user];
          }

    }

    createUser = async (email,passwd)=>{

        const {data,error}= await this.#supabaseConnection.auth.signUp({
            email: email,
            password: passwd,
          });

          if (error) {
            return false;
          }

          if (data) {
            return true;
          }
    }
}

export default Barados;