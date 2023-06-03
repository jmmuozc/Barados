import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Owner from '../Js/Owner.js';
import Customer from "../Js/Customer.js";
import Business from "../Js/Business.js";

class Barados {

  #supabaseConnection = createClient('https://wcqazpjgyqxtpiytqezb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcWF6cGpneXF4dHBpeXRxZXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNTI1NDcsImV4cCI6MTk5NzgyODU0N30.4G_KX9VntK8GeNGZpAdM7CcxqN264hySeaHw3pe5fHg');

  constructor(){
    console.log("Creado Barados");
  }

  fetchData = async (table) => {


    const { data, error } = await this.#supabaseConnection.from(table).select();

    //    console.log(fetched.data);
    // for (let data of fetched.data) {
    //     data=JSON.stringify(data);
    // }
    if (error) {
      return error;
    }
    // console.log(data);

    return JSON.parse(JSON.stringify(data));
    // return JSON.parse(JSON.stringify(data));
  }

  fetchDataWhere = async (table, condition) => {

    // console.log(condition);
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

  insertInto = async (table, newData) => {

    const {data, error } = await this.#supabaseConnection
      .from(table)
      .insert(newData)
      .select('Id');

    if (error) {
      return error;
    }

    if (data) {
      return JSON.parse(JSON.stringify(data));
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
   return false;
  }

  currentUser = async () => {

    const { data, error } = await this.#supabaseConnection.auth.getSession();

    if (data.session == null) {
      return false;
    }

    if (data) {
      // return data.session["user"].email;
      return data.session["user"].email;
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

  uploadInTo =async (imgName,img,storage)=>{

    const { data, error } = await this.#supabaseConnection.storage.from(storage).
    upload(imgName,img);

    let publicUrl= await this.#supabaseConnection.storage.from(storage).getPublicUrl(imgName);

    return publicUrl.data.publicUrl;
  }

  getBase64FromFile(img, callback) {
    let fileReader = new FileReader();
    fileReader.addEventListener('load', function (evt) {
      callback(fileReader.result);
    });
    fileReader.readAsDataURL(img);
    return fileReader.result;
  }
  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  toBase64(file) {
    const reader = new FileReader();
    let reject;
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    // console.log(reader.result);
  }


  // OwnerFactory(id,name){
  //   return new Owner(id,name);
  // }

  // CustomerFactory(id,name){
  //  return new Customer(id,name);  
  // }
  // BusinessFactory(id,name){
  //  return new Business(id,name);
  // }

}


export default Barados;