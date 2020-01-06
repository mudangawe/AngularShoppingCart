using Microsoft.Extensions.Configuration;

namespace ASPCOREBACKEND.Configuration
{
    public class AppConfiguration
    {
        public string ServerAddress { get; }
        public string ClientAddress { get; }
        public string Name { get; }
        public string CorsPolicy { get; }
        public string Version { get; }
        public string Description { get; }
        public string TermsOfService { get; }
        public string Connection { get; }

        public AppConfiguration(IConfiguration configuration)
        {
            ServerAddress = configuration["App:ServerRootAddress"];
            ClientAddress = configuration["App:ClientRootAddress"];
            CorsPolicy = configuration["App:CorsOrigins"];
            Name = configuration["App:Meta:Name"];
            Version = 'v' + configuration["App:Meta:Version"];
            Description = configuration["App:Description"];
            TermsOfService = configuration["App:Meta:TermsOfService"];
            Connection = configuration.GetConnectionString("Default");
        }
    }
}
