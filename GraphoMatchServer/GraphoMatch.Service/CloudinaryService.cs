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
            //ImageUploadResult uploadResult;
            //if (type == "image")
            //{
            //    var uploadParams = new ImageUploadParams
            //    {
            //        File = new FileDescription(file.FileName, stream),
            //        Transformation = new Transformation().Crop("fill").Gravity("face").Width(500).Height(500)
            //    };
            //    uploadResult = await cloudinary.UploadAsync(uploadParams);
            //}
            //else
            //{
            //    var uploadParams = new RawUploadParams
            //    {
            //        File = new FileDescription(file.FileName, stream)
            //    };
            //    uploadResult = (ImageUploadResult)await cloudinary.UploadAsync(uploadParams);
            //}

            //if (uploadResult.Error != null) return null;
            //return uploadResult.SecureUrl.AbsoluteUri;
            UploadResult uploadResult;

            if (type == "image")
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Crop("fill").Gravity("face").Width(500).Height(500)
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
    }
}




    //public async Task<bool> DeleteFileAsync(int fileId, string userId)
    //{
    //    var file = await _dbContext.UserFiles.FindAsync(fileId);
    //    if (file == null || file.UserId != userId) return false;

    //    var fileName = Path.GetFileNameWithoutExtension(new Uri(file.FileUrl).AbsolutePath);
    //    var deletionParams = new DeletionParams(fileName)
    //    {
    //        ResourceType = file.FileType == "image" ? "image" : "raw"
    //    };

    //    var deletionResult = await _cloudinary.DestroyAsync(deletionParams);
    //    if (deletionResult.Result == "ok")
    //    {
    //        _dbContext.UserFiles.Remove(file);
    //        await _dbContext.SaveChangesAsync();
    //        return true;
    //    }
    //    return false;
    //}

//    public async Task<List<UserFile>> GetUserFilesAsync(string userId)
//    {
//        return await _dbContext.UserFiles.Where(f => f.UserId == userId).ToListAsync();
//    }
//}
