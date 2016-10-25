namespace fetch_and_store.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Responses",
                c => new
                    {
                        ResponseID = c.Int(nullable: false, identity: true),
                        StatusCode = c.String(),
                        URL = c.String(),
                        ResponseTime = c.String(),
                        RequestTime = c.String(),
                        HTTPMethod = c.String(),
                    })
                .PrimaryKey(t => t.ResponseID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Responses");
        }
    }
}
