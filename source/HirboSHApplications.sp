/*
    Copyright (C) 2020 HirboSH.
    Permission is granted to copy, distribute and/or modify this document
    under the terms of the GNU Free Documentation License, Version 1.3
    or any later version published by the Free Software Foundation;
    with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
    A copy of the license is included in the section entitled "GNU
    Free Documentation License".
*/

#include <sourcemod>
#include <sdktools>

#define PLUGIN_NAME  "[CS:GO] Simple Applications"
#define PLUGIN_AUTHOR "Lior Koren - [HirboSH]"
#define PLUGIN_DESCRIPTION "[CS:GO] Simple Applications Plugin. [Connected With MySQL + Selection Menu];"
#define PLUGIN_VERSION "1.00"
#define PLUGIN_URL "https://hirbosh.cc/"
#define DEBUG

#pragma newdecls required
#pragma semicolon 1

Database g_dDatabase = null;

ConVar g_cvTimerStatus;
ConVar g_cvPREFIX;

char g_szPREFIX[64];

char g_szAnswersNum1[MAXPLAYERS + 1];
char g_szAnswersNum2[MAXPLAYERS + 1];
char g_szAnswersNum3[MAXPLAYERS + 1];
char g_szAnswersNum4[MAXPLAYERS + 1];
char g_szAnswersNum5[MAXPLAYERS + 1];
char g_szAnswersNum6[MAXPLAYERS + 1];

bool g_bNum1[MAXPLAYERS + 1] =  { true, ... };
bool g_bNum2[MAXPLAYERS + 1] =  { false, ... };
bool g_bNum3[MAXPLAYERS + 1] =  { false, ... };
bool g_bNum4[MAXPLAYERS + 1] =  { false, ... };
bool g_bNum5[MAXPLAYERS + 1] =  { false, ... };
bool g_bNum6[MAXPLAYERS + 1] =  { false, ... };

bool g_bIsWriting[MAXPLAYERS + 1] =  { false, ... };

public Plugin myinfo = {
	name = PLUGIN_NAME, 
	author = PLUGIN_AUTHOR, 
	description = PLUGIN_DESCRIPTION, 
	version = PLUGIN_VERSION, 
	url = PLUGIN_URL
};

public void OnPluginStart(){
	
	RegConsoleCmd("sm_application", CMD_Applications);
	RegConsoleCmd("sm_applications", CMD_Applications);
	RegConsoleCmd("sm_apps", CMD_Applications);
	
	g_cvTimerStatus = CreateConVar("sm_applications_timer_enabled", "1", "Enable or disable plugin timer (A reminder for applying to be an Admin). [Default = 1 / Enbaled]", 1, true, 0.0, true, 1.0);
	g_cvPREFIX = CreateConVar("sm_applications_prefix", "[Simple Applications]", "Set the plugin prefix. [Default = 'Simple Applications'];");
	
	AutoExecConfig(true, "sm_applications", "SimpleApplications");
	
	CreateTimer(300.0, TIMER_Ad, _, TIMER_REPEAT);
	
	AddCommandListener(CMD_Say, "say");
	
	SQL_MakeConnection();
}

public void OnConfigsExecuted() {
	g_cvPREFIX.GetString(g_szPREFIX, sizeof(g_szPREFIX));	
}

public void OnClientDisconnect(int client){
	if (IsFakeClient(client)){
		return;
	}
	
	ClearAll(client);
}

public Action TIMER_Ad(Handle timer){
	for (int i = 1; i <= MaxClients; i++){
		if (IsValidClient(i) && !IsValidAdmin(i) && g_cvTimerStatus.BoolValue){
			PrintToChat(i, " \x04%s \x01Want to \x04be an Admin on this server\x01? Submit an \x04Application \x01by using: `\x04!application || !applications || !apps\x01`.", g_szPREFIX);
		}
		return Plugin_Handled;
	}
	return Plugin_Continue;
}

public Action CMD_Applications(int client, int args){
	if (IsValidClient(client) && IsValidAdmin(client)){
		PrintToChat(client, " \x02%s\x01 You're already an \x04Admin\x01.", g_szPREFIX);
		return Plugin_Handled;
	}
	
	if (IsValidClient(client) && !IsValidAdmin(client)){
		Menu_Main(client);
	}
	return Plugin_Handled;
}

void Menu_Main(int client){
	Menu menu = new Menu(MenuCallBack_Main, MENU_ACTIONS_ALL);
	menu.SetTitle("%s \nMain Menu", g_szPREFIX);
	
	menu.AddItem("start", "Start An Application!");
	
	menu.ExitButton = true;
	menu.Display(client, MENU_TIME_FOREVER);
}

public int MenuCallBack_Main(Menu menu, MenuAction mAction, int param1, int param2){
	switch (mAction){
		case MenuAction_Select: {
			char szItem[32];
			menu.GetItem(param2, szItem, sizeof(szItem));
			
			if (StrEqual(szItem, "start")){
				Menu_Application(param1);
			}
			
		} case MenuAction_End: {
			delete menu;
		}
	}
}

void Menu_Application(int client){
	Menu menu = new Menu(MenuCallBack_Application, MENU_ACTIONS_ALL);
	menu.SetTitle("%s \nSubmit an Application!", g_szPREFIX);
	
	char szBuffer[512];
	
	Format(szBuffer, sizeof(szBuffer), "What is your name?");
	menu.AddItem("q1", szBuffer, g_bNum1 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	Format(szBuffer, sizeof(szBuffer), "How old are you?");
	menu.AddItem("q2", szBuffer, g_bNum2 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	Format(szBuffer, sizeof(szBuffer), "What is your Discord name and discriminator?");
	menu.AddItem("q3", szBuffer, g_bNum3 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	Format(szBuffer, sizeof(szBuffer), "Why do you deserve the job?");
	menu.AddItem("q4", szBuffer, g_bNum4 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	Format(szBuffer, sizeof(szBuffer), "How long a day can you be online?");
	menu.AddItem("q5", szBuffer, g_bNum5 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	Format(szBuffer, sizeof(szBuffer), "Do you have experience in such a position?");
	menu.AddItem("q6", szBuffer, g_bNum6 ? ITEMDRAW_DISABLED:ITEMDRAW_DEFAULT);
	
	menu.ExitBackButton = true;
	menu.Display(client, MENU_TIME_FOREVER);
}

public int MenuCallBack_Application(Menu menu, MenuAction mAction, int param1, int param2){
	switch (mAction){
		case MenuAction_Cancel: {
			if (param2 == MenuCancel_ExitBack){
				Menu_Main(param1);
			}
			
		} case MenuAction_Select: {
			char szItem[32];
			menu.GetItem(param2, szItem, sizeof(szItem));
			
			if (StrEqual(szItem, "q1")){
				PrintToChat(param1, " \x04%s\x01 What is your name?.", g_szPREFIX);
				
				g_bNum1[param1] = true;
				g_bIsWriting[param1] = true;
				
			} else if (StrEqual(szItem, "q2")){
				PrintToChat(param1, " \x04%s\x01 How old are you?.", g_szPREFIX);
				
				g_bNum2[param1] = true;
				g_bIsWriting[param1] = true;
				
			} else if (StrEqual(szItem, "q3")){
				PrintToChat(param1, " \x04%s\x01 What is your Discord name and discriminator?.", g_szPREFIX);
				
				g_bNum3[param1] = true;
				g_bIsWriting[param1] = true;
				
			} else if (StrEqual(szItem, "q4")){
				PrintToChat(param1, " \x04%s\x01 Why do you deserve the job?.", g_szPREFIX);
				
				g_bNum4[param1] = true;
				g_bIsWriting[param1] = true;
				
			} else if (StrEqual(szItem, "q5")){
				PrintToChat(param1, " \x04%s\x01 How long a day can you be online?.", g_szPREFIX);
				
				g_bNum5[param1] = true;
				g_bIsWriting[param1] = true;
				
			} else if (StrEqual(szItem, "q6")){
				PrintToChat(param1, " \x04%s\x01 Do you have experience in such a position?.", g_szPREFIX);
				
				g_bNum6[param1] = true;
				g_bIsWriting[param1] = true;
			}
			Menu_Application(param1);
			
		} case MenuAction_End: {
			delete menu;
		}
	}
}

public Action CMD_Say(int client, const char[] szCommand, int args){
	char szText[512];
	GetCmdArgString(szText, sizeof(szText));
	
	if (g_bIsWriting[client]){
		if (g_bNum1[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			g_bNum1[client] = false;
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum1[client], sizeof(g_szAnswersNum1), szText);
			
		} else if (g_bNum2[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			g_bNum2[client] = false;
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum2[client], sizeof(g_szAnswersNum2), szText);
			
		} else if (g_bNum3[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			g_bNum3[client] = false;
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum3[client], sizeof(g_szAnswersNum3), szText);
			
		} else if (g_bNum4[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			g_bNum4[client] = false;
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum4[client], sizeof(g_szAnswersNum4), szText);
			
		} else if (g_bNum5[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			g_bNum5[client] = false;
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum5[client], sizeof(g_szAnswersNum5), szText);
			
		} else if (g_bNum6[client]){
			PrintToChat(client, " \x04%s\x01 You submitted the answer: \x07%s\x01.", g_szPREFIX, szText);
			
			StripQuotes(szText);
			strcopy(g_szAnswersNum6[client], sizeof(g_szAnswersNum6), szText);
			
			PrintToChat(client, " \x04%s\x01 You \x04Successfully submited your Application\x01.", g_szPREFIX);
			
			g_bIsWriting[client] = false;
			Menu_ThankYou(client);
		}
		return Plugin_Handled;
	}
	return Plugin_Changed;
}

void Menu_ThankYou(int client){
	Menu menu = new Menu(MenuCallBack_ThankYou, MENU_ACTIONS_ALL);
	menu.SetTitle("%s \nThank You!", g_szPREFIX);
	
	menu.AddItem("", "You can close this menu now.");
	
	menu.ExitButton = true;
	menu.Display(client, MENU_TIME_FOREVER);
	
	char szSteam[512];
	GetClientAuthId(client, AuthId_Steam2, szSteam, sizeof(szSteam));
	
	char szServer[MAX_NAME_LENGTH];
	GetConVarString(FindConVar("hostname"), szServer, sizeof(szServer));
	
	char szTime[512];
	FormatTime(szTime, sizeof(szTime), "%d/%m/%Y", GetTime());
	
	char szQuery[512];
	char szBuffer[16];
	
	GetRandomApplicationID(szBuffer, sizeof(szBuffer));
	
	FormatEx(szQuery, sizeof(szQuery), "INSERT INTO `applications` (`PlayerNickName`, `PlayerAuthID`, `PlayerServer`, `ApplicationSubmitTime`, `ApplicationID`, `AnswerName`, `AnswerAge`, `AnswerDiscord`, `AnswerDeserveTheJob`, `AnswerOnDuty`, `AnswerExperience`) VALUES ('%N', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", client, szSteam, szServer, szTime, szBuffer, g_szAnswersNum1[client], g_szAnswersNum2[client], g_szAnswersNum3[client], g_szAnswersNum4[client], g_szAnswersNum5[client], g_szAnswersNum6[client]);
	g_dDatabase.Query(SQL_CheckForErrors, szQuery);
}

public int MenuCallBack_ThankYou(Menu menu, MenuAction mAction, int param1, int param2) {
	switch (mAction) {
		case MenuAction_End: {
			delete menu;
		}
	}
}

public char GetRandomApplicationID(char[] buffer, int size){
    int random;
    int len;
    size--;

    int length = 16;
    char chrs[] = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234556789";

    if (chrs[0] != '\0'){
        len = strlen(chrs) - 1;
    }

    int n = 0;

    while (n < length && n < size){
        if (chrs[0] == '\0'){
            random = GetRandomInt(33, 126);
            buffer[n] = random;
            
        } else {
            random = GetRandomInt(0, len);
            buffer[n] = chrs[random];
        }

        n++;
    }
    return buffer[length] = '\0';
}

// SQL's
void SQL_MakeConnection(){
	if (g_dDatabase != null){
		delete g_dDatabase;
	}
	
	char szError[512];
	g_dDatabase = SQL_Connect("applications", true, szError, sizeof(szError));
	
	if (g_dDatabase == null){
		SetFailState("[HirboSQL] Cannot connect to database. (Error: %s).", szError);
	}
	
	char szQuery[512];
	
	FormatEx(szQuery, sizeof(szQuery), "CREATE TABLE IF NOT EXISTS `applications` (`PlayerNickName` VARCHAR(64), `PlayerNickName` VARCHAR(64), `PlayerAuthID` VARCHAR(32), `PlayerServer` VARCHAR(64), `ApplicationSubmitTime` VARCHAR(32), `ApplicationID` VARCHAR(32), `AnswerName` VARCHAR(128), `AnswerAge` VARCHAR(128), `AnswerDiscord` VARCHAR(128), `AnswerDeserveTheJob` VARCHAR(128), `AnswerOnDuty` VARCHAR(128), `AnswerExperience` VARCHAR(128), UNIQUE(`PlayerAuthID`), UNIQUE(`ApplicationID`));");
	g_dDatabase.Query(SQL_CheckForErrors, szQuery);
}

public void SQL_CheckForErrors(Database dDatabase, DBResultSet dbResults, const char[] szError, any aData){
	if (!StrEqual(szError, "")) {
		LogError("[HirboSQL] Database Error (%s).", szError);
		return;
	}
}

// Stocks

stock void ClearAll(int client){
	g_bNum1[client] = false;
	g_bNum2[client] = false;
	g_bNum3[client] = false;
	g_bNum4[client] = false;
	g_bNum5[client] = false;
	g_bNum6[client] = false;
}

stock bool IsValidAdmin(int client){
	if (client >= 1 && client <= MaxClients && CheckCommandAccess(client, "", ADMFLAG_SLAY)){
		return true;
	}
	return false;
}

stock bool IsValidClient(int client){
    if (client >= 1 && client <= MaxClients && IsClientConnected(client) && IsClientInGame(client) && !IsFakeClient(client) && !IsClientSourceTV(client) && !IsClientReplay(client)){
        return true;
    }
    return false;
}
