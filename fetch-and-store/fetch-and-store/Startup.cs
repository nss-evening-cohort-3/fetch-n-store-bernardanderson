using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(fetch_and_store.Startup))]
namespace fetch_and_store
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
