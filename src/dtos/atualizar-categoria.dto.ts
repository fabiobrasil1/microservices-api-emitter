import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class AtualizarCategoria{
  @IsString()
  @IsOptional()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos:Array<Evento>

}

interface Evento{
  nome:string;
  opercao:string;
  valor:number;
}