import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
class Barados {

  #supabaseConnection = createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');

  fetchData = async (table) => {


    const { data, error } = await this.#supabaseConnection.from(table).select();

    //    console.log(fetched.data);
    // for (let data of fetched.data) {
    //     data=JSON.stringify(data);
    // }
    if (error) {
      return error;
    }
    console.log(data);

    return JSON.parse(JSON.stringify(data));
    // return JSON.parse(JSON.stringify(data));
  }

  fetchDataWhere = async (table,condition) => {

    console.log(condition);
    const { data, error } = await this.#supabaseConnection.from(table).select().match(condition);

      //  console.log(fetched.data);
    // for (let data of fetched.data) {
    //     data=JSON.stringify(data);
    // }
    if (error) {
      return error;
    }

    return JSON.parse(JSON.stringify(data));
  }
  
  insertInto = async (table, data) => {

    const { error } = await this.#supabaseConnection
      .from(table)
      .insert(data)

    if (error) {
      return error;
    }
  }

  logIn = async (email, passwd) => {

    const { data, error } = await this.#supabaseConnection.auth.signInWithPassword({
        email: email,
        password: passwd,
      });



    
    if (error == null) {
      return data.user["email"];
      // return JSON.stringify(data.user["email"]);
    } else {
      return false;
    }
  }

  logOff = async () => {

    const { error } = await this.#supabaseConnection.auth.signOut();

    if (error) {
      return false;
    }

  }

  currentUser = async () => {

    const { data, error } = await this.#supabaseConnection.auth.getSession();

    if (error) {
      return error;
    }

    if (data) {
      return JSON.stringify(data.session["user"].email);
    }

  }

  createUser = async (email, passwd) => {

    const { data, error } = await this.#supabaseConnection.auth.signUp({
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