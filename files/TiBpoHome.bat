@echo off
title BpoHome
:inicio
mode 75,26
cls
color f0
echo 浜様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様?
echo 魂憶臼旭?"     __________   _   __           __                "旭葦臼臆?
echo 魂憶臼旭?"    /_  __/  _/  / | / /__  ____  / /_  ____  ____   "旭葦臼臆?
echo 魂憶臼旭?"     / /  / /   /  |/ / _ \/ __ \/ __ \/ __ \/ __ \  "旭葦臼臆?
echo 魂憶臼旭?"    / / _/ /   / /|  /  __/ /_/ / /_/ / /_/ / /_/ /  "旭葦臼臆? 
echo 魂憶臼旭?"   /_/ /___/  /_/ |_/\___/\____/_.___/ .___/\____/   "旭葦臼臆?
echo 魂憶臼旭?"                                    /_/              "旭葦臼臆?
echo 麺様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様様?
echo ?                              FERRAMANTAS                              ?
echo 麺様様様様様様様様様様様様様様様様様僕様様様様様様様様様様様様様様様様様?
echo ?[1]      Conectar VPN              ? [6]      Webserver                ?
echo 麺様様様様様様様様様様様様様様様様様陵様様様様様様様様様様様様様様様様様?
echo ?[2]    Colocar no Dominio          ? [7]    Abrir Cmd Adm              ?
echo 麺様様様様様様様様様様様様様様様様様陵様様様様様様様様様様様様様様様様様?
echo ?[3]      Gpupdate GPO              ? [8]  Desinstalar Programa         ?
echo 麺様様様様様様様様様様様様様様様様様陵様様様様様様様様様様様様様様様様様?
echo ?[4]      Abrir Servicos            ? [9]    Test de Ping               ?
echo 麺様様様様様様様様様様様様様様様様様陵様様様様様様様様様様様様様様様様様?
echo ?[5]     Corrigi Services           ? [10]  Agendador de tarefa         ?
echo 麺様様様様様様様様様様様様様様様様様陵様様様様様様様様様様様様様様様様様?
echo ?[11]     Adapdores de Rede         ? [x]  Sair           浜様様様様様様融
echo 藩様様様様様様様様様様様様様様様様様瞥様様様様様様様様様様? By Cassio.S  ?
echo                                                           藩様様様様様様夕               
echo.
echo.
set /p opcao= Selecione a opcao dejesada:

if %opcao% ==1 goto op1
if %opcao% ==2 goto op2
if %opcao% ==3 goto op3
if %opcao% ==4 goto op4
if %opcao% ==5 goto op5
if %opcao% ==6 goto op6
if %opcao% ==7 goto op7
if %opcao% ==8 goto op8
if %opcao% ==9 goto op9
if %opcao% ==10 goto op10
if %opcao% ==11 goto op11
if %opcao% ==x goto opx
if %opcao% GEQ 12 goto erro 
if %opcao% LSS 1 goto erro 


:op1
"C:\Program Files\OpenVPN\bin\openvpn-gui.exe" --connect COVTSMFW004-UDP4-2195-config.ovpn
goto inicio

:op2
sysdm.cpl
goto inicio

:op3
gpupdate /force /boot
goto inicio

:op4
services.msc
goto inicio

:op5
sc.exe config lanmanworkstation depend= bowser/mrxsmb10/mrxsmb20/nsi
pause
sc.exe config mrxsmb10 start= auto
pause
goto inicio

:op6
start iexplore "http://10.221.242.147/FileServer/Files/Ramais/Atualizacoes/BPOHOME/NET/"

goto inicio

:op7
runas /u:policarpo.quaresma "cmd"
goto inicio

:op8
appwiz.cpl
goto inicio

:op9
ping bpohome.br -t
pause
goto inicio

:op10
taskschd.msc
goto inicio

:op11
ncpa.cpl
goto inicio

goto opx


:opx
exit

:erro
echo Entrada invalida
echo Digite ENTER para continuar.
pause > nul
goto inicio

echo.

pause



