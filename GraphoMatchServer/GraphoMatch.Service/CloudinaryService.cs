using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using GraphoMatch.Core.Repositories;
using Microsoft.AspNetCore.Http;
using System.IO;
using GraphoMatch.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;
using DotNetEnv;


namespace GraphoMatch.Service
{
    public class CloudinaryService
    {
        public CloudinaryService() { }

        public async Task<string> UploadFileAsync(IFormFile file,int userId, string type)
        {
            Env.Load();
            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");
            var account = new Account(
                cloudName,      
                apiKey,         
                apiSecret       
            );
            var cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true; 

            if (file.Length == 0) return null;
            using var stream = file.OpenReadStream();
           
            UploadResult uploadResult;

            if (type == "image")
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Crop("fill").Gravity("face")
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams);
            }
            else
            {
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream)
                };
                uploadResult = await cloudinary.UploadAsync(uploadParams); // No casting needed
            }

            // Check if upload was successful
            if (uploadResult.Error != null) return null;
            return uploadResult.SecureUrl.AbsoluteUri;

        }

        public string ExtractPublicIdFromUrl(string url)
        {
            var uri = new Uri(url);
            var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            var uploadIndex = Array.IndexOf(segments, "upload");
            if (uploadIndex < 0 || uploadIndex + 1 >= segments.Length)
                throw new Exception("Invalid Cloudinary URL");

            var publicId = string.Join("/", segments.Skip(uploadIndex + 2)); // skip version
            return Path.ChangeExtension(publicId, null); // remove extension
        }


        public async Task<bool> DeleteFileAsync(string url)
        {
            Env.Load();
            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");
            var account = new Account(
                cloudName,
                apiKey,
                apiSecret
            );
            var cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true;
            var deletionParams = new DeletionParams(ExtractPublicIdFromUrl(url));
            var deletionResult = await cloudinary.DestroyAsync(deletionParams);
            if (deletionResult.Result == "ok")
            {
                return true;
            }
            return false;
        }

    }
}
