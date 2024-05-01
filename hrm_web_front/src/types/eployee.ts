export interface Employee {
  avatar?: string,
  e_id?: number,
  name?: string,
  age?: number,
  sex?: string,
  e_section?: string,
  e_grade?: string,
  salary?: number,
  e_identification?: string,
  e_address?: string,
  e_mail?: string,
  e_phone?: number,
  password?: string,
}
export interface getEmployee {
  data: Employee[],
  success?: boolean,
  message?: string,
  status: number
}