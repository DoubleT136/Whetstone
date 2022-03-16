# Whetstone
World's first mobile AR mind palace app.

#TestFlight Build Installation Instructions - iOS:
1. Download TestFlight from the iOS App Store - https://apps.apple.com/ie/app/testflight/id899247664
2. Visit https://testflight.apple.com/join/WQae7CN7 on your phone, log into your Apple ID, and accept the invitation to test the app.
3. TestFlight should install the app and allow you to run it on your phone

#React Native Practices

*Project uses yarn, so whenever you're executing react-native terminal commands within the 'client' folder, make sure you preface your instruction with 'yarn' rather than 'npm' or 'npx' - eg. 'yarn react-native run-ios'

*If you run into CompileC errors on build for ios, cd into 'client/ios', run 'rm -rf Pods', then 'pod update', and then 'pod install'

*If you run into 'unable to resolve module' warnings, cd into 'client', run rm -rf node_modules', 'yarn install' then 'yarn start --reset-cache'

#Xcode Specifics
*With integration of ViroReact for AR, the app currently does not run on the iOS simulator. This is not an error with the app itself, it builds fine to an actual phone. But it does present a challenge for dev and demo, so will try to fix in future.
*On my (Harry's) machine, I've configured XCode with a personal development team & bundle identifier to help with any legitimacy checks. Will see if this is necessary for any other devs on the project.

*If you run into 'unable to resolve module' warnings, run 'yarn install' then 'yarn start --reset-cache'
