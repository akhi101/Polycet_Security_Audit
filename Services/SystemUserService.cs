﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TSPOLYCET.Models;
using TSPOLYCET.Models.Database;

namespace TSPOLYCET.Services
{
    public class SystemUserService
    {

        public DataSet GetUserLogin(PolycetdbHandler dbHandler, string UserName, string UserPassword, string IPAddress, string SessionID,string Type)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    if(Type == "student") { 
                    using (var cmd = new SqlCommand("SP_Get_StudentLoginPermission", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                        cmd.Parameters.Add(new SqlParameter("@IPAddress", IPAddress));
                        cmd.Parameters.Add(new SqlParameter("@SessionID", SessionID));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(ds);
                        conn.Close();
                    }
                    }
                    else
                    {
                        using (var cmd = new SqlCommand("SP_Get_UserLoginPermission", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                            cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                            cmd.Parameters.Add(new SqlParameter("@IPAddress", IPAddress));
                            cmd.Parameters.Add(new SqlParameter("@SessionID", SessionID));
                            conn.Open();
                            var da = new SqlDataAdapter(cmd);
                            da.Fill(ds);
                            conn.Close();
                        }
                    }
                }
                return ds;


            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }

        public DataSet GetUserLogout(PolycetdbHandler dbHandler,string DataType, string UserName, string IPAddress, string SessionID)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Set_User_Student_Logout", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@DataType", DataType));
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@IPAddress", IPAddress));
                        cmd.Parameters.Add(new SqlParameter("@SessionID", SessionID));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(ds);
                        conn.Close();
                    }
                }
                return ds;


            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }

        public DataSet GetAdminStudentLogin(PolycetdbHandler dbHandler, string UserName, int DataType)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
               
                        using (var cmd = new SqlCommand("SP_Get_AdminStudentLogin", conn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                            cmd.Parameters.Add(new SqlParameter("@DataType", DataType));
                            conn.Open();
                            var da = new SqlDataAdapter(cmd);
                            da.Fill(ds);
                            conn.Close();
                        }
                    }
                
                return ds;


            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }

        public DataTable GetForgotPassword(PolycetdbHandler dbHandler, int DataType, string UserName, Int64 RegistrationMobile)
        {
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@RegistrationMobile", RegistrationMobile);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_User_Student_ForgotPassword", param);
                return res;

            }
            catch (Exception ex)
            {

                PolycetdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }
        }


        public int GetCheckOldPassword(PolycetdbHandler dbHandler, string OldPassword, int LoggedUserId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT isnull(count(*),0) as cnt from SystemUser where LoginPassword ='" + OldPassword + "' and SysUserID = " + LoggedUserId + " ";
                return Convert.ToInt32(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetChangePassword(PolycetdbHandler dbHandler,int DataType, int UserID, string OldPassword, string NewPassword)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Set_User_Student_ChangePassword", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@DataType", DataType));
                        cmd.Parameters.Add(new SqlParameter("@UserID", UserID));
                        cmd.Parameters.Add(new SqlParameter("@OldPassword", OldPassword));
                        cmd.Parameters.Add(new SqlParameter("@NewPassword", NewPassword));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        conn.Close();
                    }
                }
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable GetUserModules(PolycetdbHandler PolycetdbHandler, int UserTypeID)
        {
            try
            {
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                return PolycetdbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserModules", param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public DataTable GetUserSubModules(PolycetdbHandler dbHandler, int UserTypeID, int ModuleID)
        {
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);

                return dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserSubModules", param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}