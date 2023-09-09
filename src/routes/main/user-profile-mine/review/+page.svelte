<script lang='ts'>
    import { userProfile } from '../../../../stores';
    let userProfileValue: any;
	userProfile.subscribe(value => {
		userProfileValue = value;
	});
</script>

<body class="bg-[#2A2F42] h-screen">

</body>