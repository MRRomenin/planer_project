PGDMP      .                }            db_dependence     17.4 (Ubuntu 17.4-1.pgdg24.04+2)     17.4 (Ubuntu 17.4-1.pgdg24.04+2) $    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16389    db_dependence    DATABASE     y   CREATE DATABASE db_dependence WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'ru_RU.UTF-8';
    DROP DATABASE db_dependence;
                     roman    false            �            1259    16405    card    TABLE     z   CREATE TABLE public.card (
    id integer NOT NULL,
    title_card character varying NOT NULL,
    "columnsId" integer
);
    DROP TABLE public.card;
       public         heap r       roman    false            �            1259    16475    card_id_seq    SEQUENCE     t   CREATE SEQUENCE public.card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.card_id_seq;
       public               roman    false    219            �           0    0    card_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;
          public               roman    false    222            �            1259    16398    columns    TABLE     {   CREATE TABLE public.columns (
    id integer NOT NULL,
    title_colum character varying NOT NULL,
    "userId" integer
);
    DROP TABLE public.columns;
       public         heap r       roman    false            �            1259    16492    columns_id_seq    SEQUENCE     w   CREATE SEQUENCE public.columns_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.columns_id_seq;
       public               roman    false    218            �           0    0    columns_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.columns_id_seq OWNED BY public.columns.id;
          public               roman    false    223            �            1259    16412    comments    TABLE     k   CREATE TABLE public.comments (
    id integer NOT NULL,
    comment text NOT NULL,
    "cardId" integer
);
    DROP TABLE public.comments;
       public         heap r       roman    false            �            1259    16514    comments_id_seq    SEQUENCE     x   CREATE SEQUENCE public.comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public               roman    false    220            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public               roman    false    224            �            1259    16391    user    TABLE     �   CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public."user";
       public         heap r       roman    false            �            1259    16452    user_id_seq    SEQUENCE     t   CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.user_id_seq;
       public               roman    false    217            �           0    0    user_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;
          public               roman    false    221            �           2604    16476    card id    DEFAULT     b   ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);
 6   ALTER TABLE public.card ALTER COLUMN id DROP DEFAULT;
       public               roman    false    222    219            �           2604    16493 
   columns id    DEFAULT     h   ALTER TABLE ONLY public.columns ALTER COLUMN id SET DEFAULT nextval('public.columns_id_seq'::regclass);
 9   ALTER TABLE public.columns ALTER COLUMN id DROP DEFAULT;
       public               roman    false    223    218            �           2604    16515    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public               roman    false    224    220            �           2604    16453    user id    DEFAULT     d   ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
 8   ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
       public               roman    false    221    217            �          0    16405    card 
   TABLE DATA           ;   COPY public.card (id, title_card, "columnsId") FROM stdin;
    public               roman    false    219   &       �          0    16398    columns 
   TABLE DATA           <   COPY public.columns (id, title_colum, "userId") FROM stdin;
    public               roman    false    218   �&       �          0    16412    comments 
   TABLE DATA           9   COPY public.comments (id, comment, "cardId") FROM stdin;
    public               roman    false    220   �&       �          0    16391    user 
   TABLE DATA           5   COPY public."user" (id, email, password) FROM stdin;
    public               roman    false    217   a'       �           0    0    card_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.card_id_seq', 5, true);
          public               roman    false    222            �           0    0    columns_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.columns_id_seq', 4, true);
          public               roman    false    223            �           0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 7, true);
          public               roman    false    224            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 28, true);
          public               roman    false    221            �           2606    16455 #   user UQ_e12875dfb3b1d92d7d7c5377e22 
   CONSTRAINT     c   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);
 Q   ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
       public                 roman    false    217            �           2606    16411    card card_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.card DROP CONSTRAINT card_pkey;
       public                 roman    false    219            �           2606    16404    columns colum_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.columns
    ADD CONSTRAINT colum_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.columns DROP CONSTRAINT colum_pkey;
       public                 roman    false    218            �           2606    16418    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public                 roman    false    220            �           2606    16397    user user_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."user" DROP CONSTRAINT user_pkey;
       public                 roman    false    217            �           2606    16499 &   columns FK_43dea26ad518ea50c5a45c17724    FK CONSTRAINT     �   ALTER TABLE ONLY public.columns
    ADD CONSTRAINT "FK_43dea26ad518ea50c5a45c17724" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.columns DROP CONSTRAINT "FK_43dea26ad518ea50c5a45c17724";
       public               roman    false    218    217    3316            �           2606    16521 #   card FK_9e47bd96a8ce75598a576192b77    FK CONSTRAINT     �   ALTER TABLE ONLY public.card
    ADD CONSTRAINT "FK_9e47bd96a8ce75598a576192b77" FOREIGN KEY ("columnsId") REFERENCES public.columns(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.card DROP CONSTRAINT "FK_9e47bd96a8ce75598a576192b77";
       public               roman    false    219    218    3318            �           2606    16516 '   comments FK_e0d58e922daf1775d69a9965ad0    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0" FOREIGN KEY ("cardId") REFERENCES public.card(id) ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_e0d58e922daf1775d69a9965ad0";
       public               roman    false    220    219    3320            �   r   x�3�,�,�I�4�2估�[/쾰�b�����.컰��NC.#������^lS �o��Ln���bT�)�	@ξ{����[.lj��{/츰�ӄ+F��� �>M�      �   M   x�3��/U�--.Q�,V�,�4�2�LL�/-�4�2����L�/쿰�b�}v)\�~aÅ-6\lj����� ��      �   [   x�3漰�[/쾰����8��8KJ�Μ̒��T��Ԋ��ԢTNc.s��.6���԰�b� .�+r�r��qqq ��'      �   �   x�E��n�0  �3}���Wo:!T�@��م�J7�H	�����w���5B���/7% �.��0�`����Tן���,���ĩ8��1}�tu���crj�qFC���`�^_W38{W�����q�א��^AY�i +�+T�h8!��4��� �ڹj���6�)j!Y�&}4��hNa�$k��̺�͍6a��N�EX�o xSH�     