import FeaturesController from "../../../biz/controllers/Features/FeaturesController"

const featuresController = new FeaturesController()

let featuresFN = {
    type: 'GET',
    url: '/v1/features/onLine',
    callback: async (ctx) => {
        await featuresController.uploadFiles(ctx)
    }
}

export default {
    featuresFN
}
