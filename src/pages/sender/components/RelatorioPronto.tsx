import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const RelatorioPronto = () => {
  const { relatorio } = useContext(AuthContext);
  return (
    <>
      <h1>Relatório</h1>
      {relatorio.map((item: any) => {
        <>
          <h3>Relatório {item.idSolicitacao}</h3>
          <textarea name="relatorio" id="relatorio">
            Id da Solicitação: {item.idSolicitacao} &#10; Motivo da Missão:{" "}
            {item.motivoMissao} &#10; Destino: {item.destino} &#10; Viatura:{" "}
            {item.viatura} &#10; Motorista: {item.motorista} &#10; Aprovador:{" "}
            {item.aprovador} &#10; Id do Registro: {item.idRegistro} &#10; KM
            Inicial: {item.kmInicial} &#10; Status da Missão:{" "}
            {item.statusMissao} &#10; KM Final: {item.kmFinal} &#10; Data/Hora
            da Saída: {item.dataHrSaida} &#10; Data/Hora da Chegada:{" "}
            {item.dataHrChegada} &#10; Retorno do motorista:{" "}
            {item.motoristaRetorno} &#10; Óleo: {item.oleo} &#10; Pneu:{" "}
            {item.pneu} &#10; Água do Radiador: {item.aguaRadiador} &#10;
            Amassado: {item.amassado} &#10; Arranhado: {item.aranhado} &#10;
            Tanque: {item.tanque} &#10; Observação: {item.observacao} &#10;
            Aprovador de Retorno: {item.aprovadorRetorno} &#10;
          </textarea>
        </>;
      })}
    </>
  );
};

export default RelatorioPronto;
