%%imports%%

const send200Status%%send200Status%% = (req, res) => {
  res.status(200).json({ status: "OK" });
};

const errorHandler%%errorHandler%% = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ errors: { message: err.message } });
};

%%export%% ({ app, config }%%loaderArgs%%) => {
   app.get("/status", send200Status);
  app.head("/status", send200Status);

  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());

  app.use(express.json());

  app.use(get(config, "api.prefix", ""), routes());

  app.use(errorHandler);
};
