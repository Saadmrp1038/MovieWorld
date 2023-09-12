<script lang="ts">
    import { userProfile ,userAvatar } from '../../../stores';
    let userProfileValue: any;
    let userAvatarValue: any;
	userProfile.subscribe(value => {
		userProfileValue = value;
	});
    userAvatar.subscribe(value => {
		userAvatarValue = value;
	});

</script>

<div class="flex flex-col items-center">
    <img width=300 height=300 class="rounded-full" src={userAvatarValue.url} alt="not found"/>
    <p class="text-white p-3 text-3xl">{userProfileValue.username}</p>
    <!-- <p class="text-white p-3 text-2xl font-light">Account Created: </p> -->
</div>

