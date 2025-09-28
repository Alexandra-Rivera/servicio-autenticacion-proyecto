export interface UpdatePasswordDto {
  code: string; //Codigo de recuperacion enviado al correo electronico
  email: string; // correo electronico del usuario
  password: string; // nueva contrasena
}
