const { Joi, errors, celebrate } = require('celebrate');

const Notification = require('./model');
const { notificationsSet1, notificationsSet2, notificationsSet3 } = require('./notifications');

module.exports = (app) => {

    let requestNo = 0;

    app.get('/', (req, res) => {
        return res.send('API endpoint root');
    });

    app.get('/getNotifications', async (req, res) => {

        requestNo += 1;

        switch (requestNo) {
            case 1:
                await Notification.insertMany(notificationsSet1);
                break;
            case 2:
                await Notification.insertMany(notificationsSet2);
                break;
            case 3:
                await Notification.insertMany(notificationsSet3);
                break;
            default:
                await Notification.deleteMany({});
                requestNo = 0;
        }

        const notifications = await Notification.find({ dismissed: false });
        return res.json({ data: notifications });
    });

    app.post('/readNotifications', celebrate({
        body: Joi.object().keys({
            notifications: Joi.array().items(Joi.string()).required()
        })
    }),
        async (req, res) => {
            await Notification.updateMany({ _id: { $in: req.body.notifications } }, { $set: { unread: false } });
            return res.send('success');
        }
    )

    app.post('/dismissNotifications', celebrate({
        body: Joi.object().keys({
            notifications: Joi.array().items(Joi.string()).required()
        })
    }),
        async (req, res) => {
            await Notification.updateMany({ _id: { $in: req.body.notifications } }, { $set: { dismissed: true } });
            return res.send('success');
        }
    )

    app.use(errors());
}