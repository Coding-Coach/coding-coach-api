// import "reflect-metadata";
// import { container } from "tsyringe";
import azurestorage, { TableService } from "azure-storage";
import { GenericContainer } from "testcontainers";
import { StartedTestContainer } from "testcontainers/dist/test-container";
import { TestModule } from "./test-module";
import { BoundaryModule } from "@modules/boundary-module";

class Setup {
  private tableService: TableService;
  private azureStorageContainer: StartedTestContainer;

  public async initialize(): Promise<void> {
    console.log("initialize");

    console.log("container setup complete");

    const container = new GenericContainer("zadika/azurite").withExposedPorts(
      10000,
      10001,
      10002
    );

    this.azureStorageContainer = await container.start();

    const tableStoragePort = this.azureStorageContainer.getMappedPort(10002);
    const connectionString = `AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:${tableStoragePort}/devstoreaccount1;`;
    console.log(connectionString);

    this.tableService = new azurestorage.TableService(connectionString);

    const testTableService = new azurestorage.TableService(connectionString);

    TestModule.injector.provide({
      provide: "TableService",
      useValue: testTableService,
      overwrite: true
    });

    BoundaryModule.injector.provide({
      provide: "TableService",
      useValue: this.tableService,
      overwrite: true
    });

    console.log("container started");
  }

  public async createAzureStorageTables(
    ...tableNames: Array<string>
  ): Promise<void[]> {
    return await Promise.all(
      tableNames.map(async tableName => {
        await this.createAzureStorageTable(tableName);
      })
    );
  }

  private async createAzureStorageTable(
    tableName: string
  ): Promise<TableService.TableResult> {
    return new Promise((resolve, reject) => {
      try {
        this.tableService.createTable(tableName, (err, result) => {
          // if (err) {
          //   reject(err);
          // }
          resolve();
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  public async dispose(): Promise<void> {
    if (this.azureStorageContainer) {
      await this.azureStorageContainer.stop();
    }
  }
}

export { Setup };
