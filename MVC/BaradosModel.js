import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';


class Barados {

  #supabaseConnection = createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');

  constructor(){
  }

  /**
   * Funcion que devuelve la informacion de una tabla
   * @param {String} table 
   * @returns 
   */
  fetchData = async (table) => {


    const { data, error } = await this.#supabaseConnection.from(table).select();

    if (error) {
      return error;
    }

    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Funcion que devuelve la informacion de un dato de una tabla segun unas condiciones
   * @param {String} table 
   * @param {Object} condition 
   * @returns 
   */
  fetchDataWhere = async (table, condition) => {

    const { data, error } = await this.#supabaseConnection.from(table).select().match(condition);

    if (error) {
      return error;
    }

    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Funcion que devuelve la informacion que deseaba segun una condicion
   * @param {String} table 
   * @param {Object} select 
   * @param {Object} condition 
   * @returns 
   */
  fetchDataSelect = async(table,select,condition)=>{

    const { data, error } = await this.#supabaseConnection
  .from(table)
  .select(select)
  .match(condition);

  if (error){return error}

  return data;
  }

  /**
   * Funcion que actualiza los campos de una tabla segun su Id
   * @param {String} table 
   * @param {Object} newData 
   * @param {String} idUser 
   */
  updateDataWhere = async(table,newData,idUser)=>{
    const { error } = await this.#supabaseConnection
  .from(table)
  .update(newData)
  .eq('Id', idUser);
  }

  /**
   * Funcion que inserta datos en una tabla
   * @param {String} table 
   * @param {Object} newData 
   * @returns 
   */
  insertInto = async (table, newData) => {

    const {data, error } = await this.#supabaseConnection
      .from(table)
      .insert(newData)
      .select('*');

    if (error) {
      return error;
    }

    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  }

  /**
   * Funcion que elimina un dato de una tabla segun el Id
   * @param {String} table 
   * @param {String} idData 
   */
  deleteDataWhere =async(table,idData)=>{
    const { error } = await this.#supabaseConnection
  .from(table)
  .delete()
  .eq('Id',idData)
  }

  /**
   * Funcion que elimina de la tabla segun una condicion
   * @param {String} table 
   * @param {Object} condition 
   */
  deleteDataEventCustomer =async(table,condition)=>{
    const { error } = await this.#supabaseConnection
  .from(table)
  .delete()
  .match(condition)
  }

  /**
   * Funcion que inicia sesion en el entorno de Supabase
   * @param {String} email 
   * @param {String} passwd 
   * @returns 
   */
  logIn = async (email, passwd) => {

    const { data, error } = await this.#supabaseConnection.auth.signInWithPassword({
      email: email,
      password: passwd,
    });

    if (error) {
      return false;
      
    } else {
      return data.user["email"];
    }
  }

  /**
   * Funcion que cierra sesion en supabase
   * @returns 
   */
  logOff = async () => {

    const { error } = await this.#supabaseConnection.auth.signOut();

    if (error) {
      return false;
    }
   return false;
  }

  /**
   *  Funcion que devuelve el correo del usuario actual de supabase
   * @returns Correo usuario actual
   */
  currentUser = async () => {

    const { data, error } = await this.#supabaseConnection.auth.getSession();

    if (data.session == null) {
      return false;
    }

    if (data) {

      return data.session["user"].email;
    }

  }

  /**
   * Funcion que crea un usuario en el entorno de supabase
   * @param {Object} newUser 
   * @returns 
   */
  createUser = async (newUser) => {
    const { data, error } = await this.#supabaseConnection.auth.signUp(newUser);

    if (error) {

      return false;
    }

    if (data) {
      return true;
    }
  }

  /**
   * Funcion que sube un contenido multimedia a supabase
   * @param {String} imgName 
   * @param {Object} img 
   * @param {Strign} storage 
   * @returns 
   */
  uploadInTo =async (imgName,img,storage)=>{

    const { data, error } = await this.#supabaseConnection.storage.from(storage).
    upload(imgName,img);

    let publicUrl= await this.#supabaseConnection.storage.from(storage).getPublicUrl(imgName);

    return publicUrl.data.publicUrl;
  }


}


export default Barados;