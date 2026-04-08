import { AppConfig } from "@fe/shared";
import { environment } from "./environments/environment";

const CONFIG: AppConfig = {
  apiUrl: environment.apiUrl,
  imagesUrl: environment.imagesUrl,
  defaultImageUrl: environment.defaultImageUrl,
  envRCP: environment.production,
  version: '1.0.0',
  domain: environment.domain,
  googleVerificationId: environment.googleVerificationId,
  blogName: environment.blogName,
  twitterName: environment.twitterName
}

export default CONFIG;