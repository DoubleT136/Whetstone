# Whetstone
World's first mobile AR mind palace app.

#React Native Practices

*Project uses npx, so whenever you're executing react-native terminal commands within the 'client' folder, make sure you preface your instruction with 'yarn' rather than 'npm' or 'npx' - eg. 'yarn react-native run-ios'

*If you run into CompileC errors on build for ios, cd into 'client/ios', run 'rm -rf Pods', then 'pod update', and then 'pod install'

*If you run into 'unable to resolve module' warnings, cd into 'client', run rm -rf node_modules', 'yarn install' then 'yarn start --reset-cache'

#Xcode Specifics
*With integration of ViroReact for AR, the app currently does not run on the iOS simulator. This is not an error with the app itself, it builds fine to an actual phone. But it does present a challenge for dev and demo, so will try to fix in future.
*On my (Harry's) machine, I've configured XCode with a personal development team & bundle identifier to help with any legitimacy checks. Will see if this is necessary for any other devs on the project.

