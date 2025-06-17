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
        private readonly Cloudinary _cloudinary;

        public CloudinaryService()
        {
            Env.Load();

            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account)
            {
                Api = { Secure = true }
            };
        }

        public async Task<string> UploadFileAsync(IFormFile file, int userId, string type)
        {
            if (type != "image" || file.Length == 0)
                return null;

            try
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, stream),
                        PublicId = $"user_{userId}_{Guid.NewGuid()}",
                        Transformation = new Transformation()
                    };

                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                    return uploadResult.SecureUrl.AbsoluteUri;
                }
            }
            catch
            {
                return null;
            }
        }

        public string ExtractPublicIdFromUrl(string url)
        {
            var uri = new Uri(url);
            var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            var uploadIndex = Array.IndexOf(segments, "upload");

            if (uploadIndex < 0 || uploadIndex + 1 >= segments.Length)
                throw new Exception("Invalid Cloudinary URL");

            var publicId = string.Join("/", segments.Skip(uploadIndex + 2));
            return Path.ChangeExtension(publicId, null);
        }

        public async Task<bool> DeleteFileAsync(string url)
        {
            try
            {
                var publicId = ExtractPublicIdFromUrl(url);
                var deletionParams = new DeletionParams(publicId);
                var deletionResult = await _cloudinary.DestroyAsync(deletionParams);
                return deletionResult.Result == "ok";
            }
            catch
            {
                return false;
            }
        }
    }
}
