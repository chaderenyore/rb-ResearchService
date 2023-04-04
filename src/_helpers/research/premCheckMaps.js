// points allocated TODO :::::::

exports.premCheckMaps = {
    twitter_url: {
       "exist": 5,
       "DoNotExist": 0
    },
    twitter_account_age: {
        "<=1": 1,
        "<=2":2,
        "<=3": 4,
        ">=4": 5
    },
    twitter_createdAt:{"less than 5 months":0},
    date_of_project_launch:{"less than 5 moths":0},
    project_status :{
        "isActive": 5,
        "inACtive": 0,
    },
    last_tweet_date: {
    },
    is_social_media_active:{
        "true": 5,
        "false": 0
    },
}