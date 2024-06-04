export class GlobalConstants {
    //Message
    public static genericError: string = "Algo salió mal, por favor inténtalo de nuevo más tarde";
  
    //todos
    public static nombre: string = "^[a-záéíóúÁÉÍÓÚüÜ]+$";
    public static email: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static telefono: string = "^[0-9]{9,9}$";



    // usuario
    public static password: string = "^.{4,8}$";



    //medico
    public static nombreMedico: string = "^[a-zA-ZáéíóúÁÉÍÓÚüÜ]+( [a-zA-ZáéíóúÁÉÍÓÚüÜ]+)*$";
    public static edadMedico: RegExp = /^(?:[2-6][5-9]|[3-6][0-9]|70)$/;

    //Variable
    public static error: string = "error";
  }
  